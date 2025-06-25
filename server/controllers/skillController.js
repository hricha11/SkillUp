export const compareSkills = async (req, res) => {
  const { student, alumniList } = req.body;
  // student: { skills: [], certifications: [] }
  // alumniList: [{ skills: [], certifications: [] }, ...]
  try {
    const alumniSkills = new Set();
    const alumniCerts = new Set();
    alumniList.forEach(alumni => {
      (alumni.skills || []).forEach(skill => alumniSkills.add(skill));
      (alumni.certifications || []).forEach(cert => alumniCerts.add(cert));
    });

    const missingSkills = [...alumniSkills].filter(skill => !(student.skills || []).includes(skill));
    const missingCerts = [...alumniCerts].filter(cert => !(student.certifications || []).includes(cert));

    const suggestedActions = [
      ...missingSkills.map(skill => `Learn skill: ${skill}`),
      ...missingCerts.map(cert => `Obtain certification: ${cert}`)
    ];

    res.json({ missingSkills, missingCerts, suggestedActions });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}; 