const logo = new URL('../assets/hima2.webp', import.meta.url).href;

const AppName = () => {
  return (
    <>
      <img style={{ maxWidth: '100%' }} alt="App logo" src={logo} />
      <h4 style={{ textAlign: 'center' }}>
        Hiilijalanjäljen Minimointi Asuinkiinteistöissä
      </h4>
    </>
  );
};

export { AppName };
