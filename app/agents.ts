import { sensors, actuators } from "./gadget";

export interface AgentCfg {
  [id: string] : {
    listeners: string[],
    minmax_off: [number?, number?],
    minmax_on: [number?, number?],
  }
};

export namespace agents {
  export const home_agent: AgentCfg = {
    [sensors.temperature_cfg.id] : {
      listeners: [
        actuators.aircondition_cfg.id
      ],
      minmax_on:  [32.0, undefined],
      minmax_off: [undefined, 28.0]
    },
    [sensors.light_cfg.id] : {
      listeners: [
        actuators.blinds_cfg.id
      ],
      minmax_on:  [35.0, undefined],
      minmax_off: [undefined, 90.0]
    }
  };
};

export const agents_cfg: Array<AgentCfg> = [
  agents.home_agent,
];