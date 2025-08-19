import express from 'express';
import pool from '../db.js';
import { validationResult } from 'express-validator';
import { addSchoolValidators, listSchoolsValidators } from '../validators/schools.js';

const router = express.Router();

// Utility: Haversine distance in kilometers
function haversineDistance(lat1, lon1, lat2, lon2) {
  const toRad = (x) => (x * Math.PI) / 180;
  const R = 6371; // km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

router.post('/addSchool', addSchoolValidators, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { name, address, latitude, longitude } = req.body;
  try {
    const [result] = await pool.execute(
      'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)',
      [name.trim(), address.trim(), Number(latitude), Number(longitude)]
    );
    return res.status(201).json({ 
      message: 'School added successfully', 
      id: result.insertId 
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Database error' });
  }
});

router.get('/listSchools', listSchoolsValidators, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const userLat = Number(req.query.lat);
  const userLng = Number(req.query.lng);
  try {
    const [rows] = await pool.execute('SELECT id, name, address, latitude, longitude FROM schools');
    const enriched = rows.map((s) => ({
      ...s,
      distance_km: Number(haversineDistance(userLat, userLng, s.latitude, s.longitude).toFixed(3)),
    }));
    enriched.sort((a, b) => a.distance_km - b.distance_km);
    return res.json({ count: enriched.length, schools: enriched });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Database error' });
  }
});

export default router;
