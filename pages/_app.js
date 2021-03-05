import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return <>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
    <Component {...pageProps} />
  </>
}

export default MyApp
