# MindSense AI - Frontend

MindSense AI adalah platform cerdas bilingual untuk memahami emosimu, mengenali kondisi mental, dan mendapat dukungan kapan saja.

## Teknologi Utama
- **React + Vite**: Framework utama yang digunakan.
- **Vanilla CSS**: Desain UI tanpa framework, lebih cepat dan optimal.
- **FastAPI Backend**: Menangani pemrosesan AI (Hugging Face IndoBERT).

## Cara Menjalankan di Lokal

1. Pastikan Node.js sudah terinstal.
2. Install semua dependencies:
   ```bash
   npm install
   ```
3. Salin file `.env.example` menjadi `.env.local` dan isi URL backend kamu:
   ```bash
   VITE_API_URL=http://localhost:8000
   ```
4. Jalankan server:
   ```bash
   npm run dev
   ```

## Deployment ke Vercel

Saat mendeploy ke Vercel, pastikan kamu telah menambahkan Environment Variable berikut di Dashboard Vercel kamu:
- `VITE_API_URL` = `https://<URL-BACKEND-RAILWAY-KAMU>` (Tanpa `/` di akhir kalimat)

*Catatan: Jika kamu mengubah URL API di Vercel, kamu harus melakukan Redeploy agar perubahannya aktif.*
