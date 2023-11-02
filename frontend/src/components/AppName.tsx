import logo from '../assets/hima.png';

const AppName = () => {
  return (
    <div className="app-name">
      {/* <h1 className='hima'></h1>
      <h3></h3> */}
      <img style={{ maxWidth: '100%' }} src={logo} />
    </div>
  );
};

export { AppName };
