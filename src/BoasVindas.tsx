interface BoasVindasProps {
  nome: string
}

function BoasVindas(props: BoasVindasProps) {
  return <div>Olá {props.nome}</div>
}

export default BoasVindas
