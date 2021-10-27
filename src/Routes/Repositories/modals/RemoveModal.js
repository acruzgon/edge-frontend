import React from 'react';
import Modal from './Modal';
import { TextContent, Text } from '@patternfly/react-core';
import ExclamationTriangleIcon from '@patternfly/react-icons/dist/js/icons/exclamation-triangle-icon';
import warningColor from '@patternfly/react-tokens/dist/esm/global_warning_color_100';
import PropTypes from 'prop-types';

const LabelWithText = ({ label, text }) => {
  return (
    <TextContent>
      <Text component={'b'}>{label}</Text>
      <Text>{text}</Text>
    </TextContent>
  );
};

LabelWithText.propTypes = {
  label: PropTypes.string,
  text: PropTypes.string,
};

const RemoveModal = ({ toggle, isOpen, name, baseURL, reloadData }) => {
  const addSchema = {
    fields: [
      {
        component: 'plain-text',
        name: 'description',
        label:
          'Removing a repository could affect your ability to update images.',
      },
      {
        component: 'plain-text',
        name: 'name',
        label: <LabelWithText label="Name" text={name} />,
      },
      {
        component: 'plain-text',
        name: 'baseURL',
        label: <LabelWithText label="baseURL" text={baseURL} />,
      },
    ],
  };

  return (
    <Modal
      title={
        <>
          <ExclamationTriangleIcon
            color={warningColor.value}
            className="pf-u-mr-md"
          />
          Remove Repository
        </>
      }
      isOpen={isOpen}
      toggle={() => toggle({ type: 'remove' })}
      submitLabel="Remove"
      schema={addSchema}
      variant="danger"
      onSubmit={console.log}
      reloadData={reloadData}
    />
  );
};

RemoveModal.propTypes = {
  toggle: PropTypes.func,
  reloadData: PropTypes.func,
  isOpen: PropTypes.boo,
  id: PropTypes.number,
  name: PropTypes.string,
  baseURL: PropTypes.string,
  setData: PropTypes.func,
};
export default RemoveModal;