

const Authlayout = ({children}:{children: React.ReactNode}) => {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
        {children}
    </div>

  )
}

export default Authlayout
