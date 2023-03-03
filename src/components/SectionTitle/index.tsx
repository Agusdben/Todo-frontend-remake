interface Props {
  children: React.ReactNode
}

const SectionTitle: React.FC<Props> = ({ children }) => {
  return <h2 className='text-xl pb-4 font-bold'>{children}</h2>
}
export default SectionTitle
