import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { BankPopup } from '.'
import { KimaProvider } from '../..'

describe('Bank modal test', function () {
  it('click submit button', function () {
    const { container } = render(
      <KimaProvider>
        <BankPopup />
      </KimaProvider>
    )
    expect(screen.getByText('Submit')).toBeInTheDocument()

    const submitButton = container.querySelector('.bank-simulation button')
    fireEvent.click(submitButton as Element)

    expect(screen.getByText('Transferring funds ...')).toBeInTheDocument()
    expect(container).toMatchSnapshot()
  })

  it('clicking overlay should close modal', function () {
    const { container } = render(
      <KimaProvider>
        <BankPopup />
      </KimaProvider>
    )

    fireEvent.click(container.querySelector('.modal-overlay') as Element)
    expect(container).toMatchSnapshot()
  })

  it('click close button', function () {
    const { container } = render(
      <KimaProvider>
        <BankPopup />
      </KimaProvider>
    )

    fireEvent.click(container.querySelector('.topbar .icon-button') as Element)
    expect(container).toMatchSnapshot()
  })
})
