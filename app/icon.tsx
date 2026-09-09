import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const size = {
  width: 32,
  height: 32,
}
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 18,
          background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '8px',
          border: '1.5px solid #a855f7',
          color: '#ffffff',
          fontWeight: 800,
          fontFamily: 'sans-serif',
          letterSpacing: '-0.5px',
        }}
      >
        <span style={{ color: '#c084fc' }}>&lt;</span>
        <span style={{ color: '#38bdf8' }}>/</span>
        <span style={{ color: '#c084fc' }}>&gt;</span>
      </div>
    ),
    {
      ...size,
    }
  )
}
