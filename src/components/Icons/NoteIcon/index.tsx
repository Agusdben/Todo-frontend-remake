const NoteIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={'1em'} height={'1em'} viewBox="0 0 448 512" {...props}>
    <path d="M64 80c-8.8 0-16 7.2-16 16v320c0 8.8 7.2 16 16 16h224v-80c0-17.7 14.3-32 32-32h80V96c0-8.8-7.2-16-16-16H64zm224 400H64c-35.3 0-64-28.7-64-64V96c0-35.3 28.7-64 64-64h320c35.3 0 64 28.7 64 64v229.5c0 17-6.7 33.3-18.7 45.3l-90.5 90.5c-12 12-28.3 18.7-45.3 18.7H288z" />
  </svg>
)

export default NoteIcon
