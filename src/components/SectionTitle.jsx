export default function SectionTitle({ children, light = false }) {
  return (
    <h2 className={`section-heading${light ? ' section-heading--light' : ''}`}>
      {children}
    </h2>
  )
}
