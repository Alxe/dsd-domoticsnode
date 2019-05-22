import mongoose, { Schema } from "mongoose"

export enum OnOffState {
  ON  = 100.0,
  OFF =   0.0,
};

export type GenericConfig<T> = {
  id: string,
  name?: string,
  value: T,
};

export type SensorCfg = GenericConfig<number>;
export type ActuatorCfg = GenericConfig<OnOffState>;

export namespace sensors {
  export const temperature_cfg: SensorCfg = {
    id: 'temperature',
    name: 'Sensor de Temperatura',
    value: 25.0
  };

  export const light_cfg: SensorCfg = {
    id: 'light',
    name: 'Sensor de Luminosidad',
    value: 100.0,
  };

  // export const humidity_cfg: SensorCfg = {
  //   id: 'humidity',
  //   name: 'Sensor de Humedad',
  //   value: 50.0,
  // };
}

export namespace actuators {
  export const  aircondition_cfg: ActuatorCfg = {
    id: 'aircondition',
    name: 'Aire Acondicionado',
    value: OnOffState.OFF,
  };
  
  export const blinds_cfg: ActuatorCfg = {
    id: 'blinds',
    name: 'Persianas',
    value: OnOffState.ON
  };
};

export const sensors_cfg: Array<SensorCfg> = [
  sensors.temperature_cfg,
  sensors.light_cfg,
  // sensors.humidity_cfg,
];

export const actuators_cfg: Array<ActuatorCfg> = [
  actuators.aircondition_cfg,
  actuators.blinds_cfg,
];