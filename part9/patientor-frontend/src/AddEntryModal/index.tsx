import React from 'react';
import { Modal, Segment, Button } from 'semantic-ui-react';
import AddEntryForm from './AddEntryForm';
import { Entry } from '../types';

interface Props {
    modalOpen: boolean;
    onClose: () => void;
    onSubmit: (values: unknown) => void;
    error?: string;
}

const AddEntryModal = ({ modalOpen, onClose, onSubmit, error }: Props) => {
  const [type, setType] = React.useState<Entry['type']>('Hospital');
  return(
    <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
      <Modal.Header>Add a new patient</Modal.Header>
      <Modal.Content>
        {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
        <Button onClick={() => setType('Hospital')}>Hospital</Button>
        <Button onClick={() => setType('OccupationalHealthcare')}>Occupational Healthcare</Button>
        <Button onClick={() => setType('HealthCheck')}>Health Check</Button>
        <AddEntryForm onSubmit={onSubmit} onCancel={onClose} type={type} />
      </Modal.Content>
    </Modal>
  );
};

export default AddEntryModal;