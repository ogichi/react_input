import * as React from 'react';
import { MemberEntity } from '../../model/member';
import { memberAPI } from '../../api/memberAPI';
import { MemberRow } from './memberRow';
import { MemberHead } from './memberHead';
import {} from 'core-js';

interface Props {
}

// We define members as a state (the compoment holding this will be a container
// component)
interface State {
  members: Array<MemberEntity>,
  nombre: string
}

// Nice tsx guide: https://github.com/Microsoft/TypeScript/wiki/JSX
export class MembersTableComponent extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    // set initial state
    this.state = { members: [], nombre: 'lemoncode' };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({nombre: event.target.value});
  }

  loadMembers = () => {
    memberAPI.getAllMembers(this.state.nombre).then((members) =>
      this.setState({ members: members, nombre: this.state.nombre })
    );
  }

  public render() {

    return (
      <div className="row">
        <h2> Members Page</h2>
        <input type="text" name="nombre" defaultValue="lemoncode" 
        onChange={this.handleChange} placeholder="Nombre compañia"/>
        <button onClick={this.loadMembers}>Load</button>
        <table className="table">
          <thead>
            <MemberHead />
          </thead>
          <tbody>
            {
              this.state.members.map((member: MemberEntity) =>
                <MemberRow key={member.id} member={member} />
              )
            }
          </tbody>
        </table>
      </div>
    );
  }
}
