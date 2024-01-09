import loadingGIF from '../../../assets/loading.gif'

const Spinner = () => {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgb(255,255,255,0.5)',
      }}
    >
      <img src={loadingGIF} alt='loading' style={{width: '50px', height: '50px'}} />
    </div>
  )
}
export default Spinner
