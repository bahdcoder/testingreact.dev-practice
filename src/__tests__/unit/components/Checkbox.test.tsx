import React from 'react'
import { axe } from 'jest-axe'
import { render, fireEvent } from '@testing-library/react'

import Checkbox from '../../../components/Checkbox'

describe('The <Checkbox /> component', () => {
  const defaultCheckboxProps = {
    label: 'TEST_CHECKBOX_LABEL',
    id: 'TEST_CHECKBOX_ID',
    background: '#000',
    checkMarkBackground: '#fff',
    onChange: jest.fn(),
    checked: false,
  }

  const setupCheckbox = (props = defaultCheckboxProps) =>
    render(<Checkbox {...props} />)

  it('should set the id of the checkbox correctly', () => {
    const { getByLabelText } = setupCheckbox()

    expect(getByLabelText(defaultCheckboxProps.label).id).toBe(
      defaultCheckboxProps.id,
    )
  })

  it('renders correctly', () => {
    const { asFragment } = setupCheckbox()

    expect(asFragment()).toMatchSnapshot()
  })

  it('should set the checkbox to the correct checked state', () => {
    const { getByLabelText } = setupCheckbox({
      ...defaultCheckboxProps,
      checked: true,
    })

    expect(getByLabelText(defaultCheckboxProps.label)).toBeChecked()
  })

  it('should call the onChange handler when checkbox is clicked', () => {
    const { getByLabelText } = setupCheckbox({
      ...defaultCheckboxProps,
      checked: true,
    })

    const checkbox = getByLabelText(defaultCheckboxProps.label)

    fireEvent.click(checkbox)

    expect(defaultCheckboxProps.onChange).toHaveBeenCalled()
  })

  // The main test here is: Form elements should have labels.
  // Demonstrate by adding it.only to this test, and
  // removing the label from the checkbox component.
  it('should not fail any accessibility tests', async () => {
    const { container } = setupCheckbox()

    expect(await axe(container)).toHaveNoViolations()
  })
})
