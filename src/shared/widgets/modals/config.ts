import { ModalOptions, createModalStack } from 'react-native-modalfy';
import { UpdateModal } from './UpdateModal';
import { ModalNames } from 'services/ModalService';

const UpdateModalConfig: ModalOptions = {
  modal: UpdateModal,
  backBehavior: 'none',
  disableFlingGesture: true,
};


const modalConfig: Record<ModalNames, ModalOptions> = {
  UPDATE_MODAL: UpdateModalConfig,
};

const defaultOptions = { backdropOpacity: 0.2 };

export const modalStack = createModalStack(modalConfig, defaultOptions);
