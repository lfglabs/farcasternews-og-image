const { H, R } = window as any

const App = () => {
  return 'Hello'
}

R(H(App), document.getElementById('app'))
