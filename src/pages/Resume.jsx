import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload } from '@fortawesome/free-solid-svg-icons'
import Button from '../components/ui/Button'

const Resume = ({ textEnter, textLeave }) => {
  const handleDownload = (RitikMauryaResume) => {
    const link = document.createElement('a')
    link.href = `/${RitikMauryaResume}` // File must be in public/
    link.download = RitikMauryaResume
    link.click()
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-24 pb-16 px-4 sm:px-6"
    >
      <div className="max-w-xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass rounded-2xl p-8"
          onMouseEnter={textEnter}
          onMouseLeave={textLeave}
        >
          <h1 className="text-4xl sm:text-5xl font-bold mb-2">Resume</h1>
          <p className="text-sm text-green-400 mb-4 font-medium">ATS Score: 90%</p>
          <p className="text-gray-400 mb-6">Click below to download my resume in your preferred format.</p>

          <div className="flex justify-center gap-4">
            <Button onClick={() => handleDownload('RitikMauryaResume.pdf')}>
              <FontAwesomeIcon icon={faDownload} className="mr-2" />
              PDF Format
            </Button>
            <Button onClick={() => handleDownload('RitikMauryaResume.docx')}>
              <FontAwesomeIcon icon={faDownload} className="mr-2" />
              DOCX Format
            </Button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default Resume
