
import React, { FC } from "react";

interface IParam {
  id: number;
  name: string;
  type: "string" | "number";
}

interface IParamValue {
  paramId: number;
  value: string | number;
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
  value: any;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>, paramId: number) => void;
  paramId: number;
}

const params: IParam[] = [
  {
    "id": 1,
    "name": "Назначение",
    "type": "string"
  },
  {
    "id": 2,
    "name": "Длина",
    "type": "string"
  },
  {
    "id": 3,
    "name": "Ширина",
    "type": "number"
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
    },
    {
      "paramId": 3,
      "value": "39"
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
    return {
      paramValues: this.state.paramValues.map((pv) => {
        const param = this.props.params.find(param => param.id === pv.paramId)
        if (param?.type === 'number') {
          return {
            ...pv,
            value: Number(pv.value)
          }
        }
        return pv
      })
    }
  }

  private handleChange(event: React.ChangeEvent<HTMLInputElement>, paramId: number): void {
    const params = this.state.paramValues.filter(pv => pv.paramId !== paramId);
    this.setState({ paramValues: [ ...params, { "paramId": paramId, "value": event.target.value } ] });
    console.log(this.getModel());
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