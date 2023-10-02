import { Container,Navbar } from 'react-bootstrap'
import AddMovie from '../modals/AddMovie'

export const NavBar = () => {
  return (
    <Navbar >
      <Container>
        <AddMovie/>
      </Container>
    </Navbar>
  )
}