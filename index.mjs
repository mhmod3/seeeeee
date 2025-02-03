import { HiAnime } from 'aniwatch';

export default async function handler(req, res) {
  const { id, quality = 'hd-1' } = req.query;  // 'hd-1' هو القيمة الافتراضية

  if (!id) {
    return res.status(400).json({ error: 'Missing episode ID' });
  }

  // تحقق من أن الجودة هي إما 'hd-1' أو 'hd-2'
  if (!['hd-1', 'hd-2'].includes(quality)) {
    return res.status(400).json({ error: 'Invalid quality. Choose either "hd-1" or "hd-2"' });
  }

  try {
    const hianime = new HiAnime.Scraper();
    const data = await hianime.getEpisodeSources(id, quality, 'sub');
    
    // إرسال البيانات المستخرجة للمستخدم
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({
      error: err.message,
      code: err.status || 'Unknown',
      details: err.stack || 'No stack trace available'
    });
  }
}