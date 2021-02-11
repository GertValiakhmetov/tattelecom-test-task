import { createContext } from 'react';
import Service from '../services/service';

type ContextProps = {
    service: Service
}

const ServiceContext = createContext<ContextProps>({} as { service: Service });
export default ServiceContext;
