
import React, { FC } from "react";

interface IParam {
  id: number;
  name: string;
}

interface IParamValue {
  paramId: number;
  value: string;
}
  
interface IModel {
  paramValues: IParamValue[];
}

interface IProps {
  params: IParam[];
  model: IModel;
}

interface IState {
  paramValues: IParamValue[];
}

interface IInputProps {
  name: string;
  value: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>, paramId: number) => void;
  paramId: number;
}

const params: IParam[] = [
  {
    "id": 1,
    "name": "Назначение"
  },
  {
    "id": 2,
    "name": "Длина"
  }
]

const model: IModel = {
  "paramValues": [
    {
      "paramId": 1,
      "value": "повседневное"
    },
    {
      "paramId": 2,
      "value": "макси"
    }
  ]
}

const Input: FC<IInputProps> = ({ name, value, handleChange, paramId }) => {
  const idAndForString = paramId.toString();
  return (
    <label style={{ display: "flex", justifyContent: 'space-between', width: 300, marginBottom: 5 }} htmlFor={idAndForString} >{name}
      <input type="text" value={value} id={idAndForString} onChange={(event) => handleChange(event, paramId)}/>
    </label>
  )
}

class ParamEditor extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      paramValues: props.model.paramValues
    }
    this.handleChange = this.handleChange.bind(this);
  }

  public getModel(): IModel {
    return this.state;
  }

  private handleChange(event: React.ChangeEvent<HTMLInputElement>, paramId: number): void {
    const params = this.state.paramValues.filter(pv => pv.paramId !== paramId);
    this.setState({ paramValues: [ ...params, { "paramId": paramId, "value": event.target.value } ] });
    console.log(this.state.paramValues);
  }

  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {this.state.paramValues.map((pv) => {
          const name = this.props.params.find(param => param.id === pv.paramId)?.name;
          return (
            <Input
              key={pv.paramId}
              name={name ? name : ''}
              value={pv.value}
              handleChange={this.handleChange}
              paramId={pv.paramId}
            />
          );
        })}
      </div>
    );
  }
}

const App: FC = () => {
  return (
    <ParamEditor params={params} model={model}/>
  )
}

export default App;