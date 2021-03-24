import React from 'react';

import {
  render,
  cleanup,
  waitForElement,
  getByText,
  prettyDOM,
  getAllByTestId,
  fireEvent,
  getByAltText,
  getByPlaceholderText,
  queryByText,
  queryByAltText,
  waitForElementToBeRemoved,
} from '@testing-library/react';

import Application from 'components/Application';
import axios from '../../__mocks__/axios';

afterEach(cleanup);

describe('Application', () => {
  afterEach(cleanup);
  it('defaults to Monday and changes the schedule when a new day is selected', () => {
    const { getByText } = render(<Application />);

    return waitForElement(() => getByText('Monday')).then(() => {
      fireEvent.click(getByText('Tuesday'));
      expect(getByText('Leopold Silvers')).toBeInTheDocument();
    });
  });

  it('loads data, books an interview and reduces the spots remaining for Monday by 1', async () => {
    const { container, debug } = render(<Application />);
    await waitForElement(() => getByText(container, 'Archie Cohen'));
    const appointments = getAllByTestId(container, 'appointment');
    const appointment = appointments[0];
    fireEvent.click(getByAltText(appointment, 'Add'));
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: 'Lydia Miller-Jones' },
    });
    fireEvent.click(getByAltText(appointment, 'Sylvia Palmer'));
    fireEvent.click(getByText(appointment, 'Save'));
    expect(getByText(appointment, 'Saving')).toBeInTheDocument();
    await waitForElement(() => getByText(container, 'Lydia Miller-Jones'));
    const day = getAllByTestId(container, 'day').find((day) =>
      queryByText(day, 'Monday')
    );
    expect(getByText(day, 'no spots remaining')).toBeInTheDocument();
  });

  it('loads data, cancels an interview and increases the spots remaining for Monday by 1', async () => {
    const { container } = render(<Application />);
    await waitForElement(() => getByText(container, 'Archie Cohen'));
    const appointment = getAllByTestId(
      container,
      'appointment'
    ).find((appointment) => queryByText(appointment, 'Archie Cohen'));
    fireEvent.click(queryByAltText(appointment, 'Delete'));
    expect(
      getByText(
        appointment,
        'Are you sure you want to delete your appointment?'
      )
    ).toBeInTheDocument();
    fireEvent.click(queryByText(appointment, 'Confirm'));
    expect(getByText(appointment, 'Deleting')).toBeInTheDocument();
    await waitForElement(() => getByAltText(appointment, 'Add'));
    const day = getAllByTestId(container, 'day').find((day) =>
      queryByText(day, 'Monday')
    );
    expect(getByText(day, '1 spot remaining')).toBeInTheDocument();
  });
  it('loads data, edits an interview and keeps the spots remaining for Monday the same', async () => {
    const { container } = render(<Application />);
    await waitForElement(() => getByText(container, 'Archie Cohen'));
    await waitForElement(() => getByText(container, 'Archie Cohen'));
    const appointment = getAllByTestId(
      container,
      'appointment'
    ).find((appointment) => queryByText(appointment, 'Archie Cohen'));
    fireEvent.click(getByAltText(appointment, 'Edit'));
    fireEvent.change(getByPlaceholderText(appointment, 'Enter Student Name'), {
      target: { value: 'Lydia Miller-Jones' },
    });
    fireEvent.click(getByText(appointment, 'Save'));
    expect(getByText(appointment, 'Saving')).toBeInTheDocument();
    await waitForElementToBeRemoved(() => getByText(appointment, 'Saving'));
    expect(getByText(appointment, 'Lydia Miller-Jones')).toBeInTheDocument();
    expect(getByAltText(appointment, 'Edit')).toBeInTheDocument();
    const day = getAllByTestId(container, 'day').find((day) =>
      getByText(day, 'Monday')
    );
    //state is carried over from the previous test, unable to re-set test state
    expect(getByText(day, /no spots remaining/i)).toBeInTheDocument();
  });
  it('shows the save error when failing to save an appointment', async () => {
    axios.put.mockRejectedValueOnce();
    const { container } = render(<Application />);
    await waitForElement(() => getByText(container, 'Archie Cohen'));
    const appointment = getAllByTestId(container, 'appointment')[0];
    fireEvent.click(getByAltText(appointment, 'Add'));
    fireEvent.change(getByPlaceholderText(appointment, 'Enter Student Name'), {
      target: { value: 'Lydia Miller-Jones' },
    });
    fireEvent.click(getByAltText(appointment, 'Sylvia Palmer'));
    fireEvent.click(getByText(appointment, 'Save'));
    expect(getByText(appointment, 'Saving')).toBeInTheDocument();
    await waitForElementToBeRemoved(() => getByText(appointment, 'Saving'));
    expect(
      getByText(appointment, 'Could not save the appointment')
    ).toBeInTheDocument();
  });

  it('shows the delete error when failing to delete an existing appointment', async () => {
    axios.delete.mockRejectedValueOnce();
    const { container } = render(<Application />);
    await waitForElement(() => getByText(container, 'Archie Cohen'));
    const appointment = getAllByTestId(
      container,
      'appointment'
    ).find((appointment) => queryByText(appointment, 'Archie Cohen'));
    fireEvent.click(getByAltText(appointment, 'Delete'));
    expect(
      getByText(
        appointment,
        /Are you sure you want to delete your appointment?/i
      )
    ).toBeInTheDocument();
    fireEvent.click(getByText(appointment, 'Confirm'));
    expect(getByText(appointment, 'Deleting')).toBeInTheDocument();
    await waitForElementToBeRemoved(() => getByText(appointment, 'Deleting'));
    expect(
      getByText(appointment, 'Could not delete the appointment')
    ).toBeInTheDocument();
  });
});
