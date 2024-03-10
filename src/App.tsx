
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
  idAndFor: number;
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

const Input: FC<IInputProps> = ({ name, value, idAndFor }) => {
  const idAndForString = idAndFor.toString();
  return (
    <label htmlFor={idAndForString} >{name}
      <input type="text" value={value} id={idAndForString} />
    </label>
  )
}

class ParamEditor extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      paramValues: props.model.paramValues
    }
  }

  public getModel(): IModel {
    return this.state;
  }

  private handleChange(event: React.ChangeEvent<HTMLInputElement>, paramId: number): void {
    const params = this.state.paramValues.filter(param => param.paramId !== paramId);
    this.setState({ paramValues: [ ...params, { "paramId": paramId, "value": event.target.value } ] })
  }

  render() {
    return (
      <div>
        {params.map((param, index) => (
          <Input key={param["id"]} name={param["name"]} value={model["paramValues"][index]["value"]} idAndFor={model["paramValues"][index]["paramId"]} />
        ))}
      </div>
    )
  }
}

const App: FC = () => {
  return (
    <ParamEditor params={params} model={model}/>
  )
}