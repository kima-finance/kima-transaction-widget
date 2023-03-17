import puppeteer from 'puppeteer'

let browser
let page

describe('Static components', () => {
  beforeAll(async () => {
    browser = await puppeteer.launch({ headless: false })
    page = await browser.newPage()
  })

  it('contains the header text for single form mode', async () => {
    await page.goto('http://localhost:3001')
    const headerSelector =
      '#root > div > div > div > div.kima-card-header > div > div.title > h3'
    await page.waitForSelector(headerSelector)

    const headerText = await page.$eval(headerSelector, (e) => e.textContent)
    expect(headerText).toEqual('New Transfer')
  })

  it('connect wallet button text', async () => {
    const text = await page.$eval(
      '#root > div > div > div > div.kima-card-content > div > div:nth-child(2) > div > button',
      (e) => e.textContent
    )
    expect(text).toEqual('Connect Wallet')
  })

  it('connect wallet error text', async () => {
    const text = await page.$eval(
      '#root > div > div > div > div.kima-card-content > div > div:nth-child(2) > div > p',
      (e) => e.textContent
    )
    expect(text).toEqual('Wallet not connected')
  })

  it('target address should be empty', async () => {
    const text = await page.$eval(
      '#root > div > div > div > div.kima-card-content > div > div:nth-child(4) > input',
      (e) => e.value
    )
    expect(text).toBe('')
  })

  it('amount should be 0', async () => {
    const amountInput =
      '#root > div > div > div > div.kima-card-content > div > div:nth-child(5) > input[type=number]'
    const text = await page.$eval(amountInput, (e) => e.value)
    expect(text).toBe('0')
  })

  it('contron buttons are enabled', async () => {
    expect(
      await page.$(
        '#root > div > div > div > div.kima-card-footer > button:nth-child(4)[disabled]'
      )
    ).toBeNull()
    expect(
      await page.$(
        '#root > div > div > div > div.kima-card-footer > button.primary-button[disabled]'
      )
    ).toBeNull()
  })
})

describe('Help popup from dropdown menu', () => {
  it("open dropdown menu when clicks footer's help button", async () => {
    let dropdown = await page.$('.dropdown-menu.light.open')
    expect(dropdown).toBeNull()
    await page.click('.kima-card-footer .menu-button')
    dropdown = await page.$('.dropdown-menu.light.open')
    expect(dropdown).not.toBeNull()
  })

  it('click open help menu', async () => {
    await page.click(
      '.kima-card-footer .menu-button .dropdown-menu .menu-item:first-of-type'
    )
    const helpPopup = await page.$(
      '#root > div > div > div > div.modal.help-popup.light.open'
    )
    expect(helpPopup).not.toBeNull()
  })

  it('click close button on help popup', async () => {
    await page.click(
      '#root > div > div > div > div.modal.help-popup.light.open > div.kima-card-header > div > div.control-buttons > button'
    )
    const helpPopup = await page.$(
      '#root > div > div > div > div.modal.help-popup.light.open'
    )
    expect(helpPopup).toEqual({})
  })
})

describe('Switch to wizard mode', () => {
  it('click `Switch to Wizard` button', async () => {
    await page.click(
      '#root > div > div > div > div.kima-card-footer > button:nth-child(3)'
    )
    expect(
      await page.$(
        '#root > div > div > div > div.kima-card-content .network-select'
      )
    ).not.toBeNull()
  })

  it('static elements on the wizard', async () => {
    expect(
      await page.$eval(
        '#root > div > div > div > div.kima-card-content > div > p',
        (e) => e.textContent
      )
    ).toEqual('Which network are you funding from?')
  })

  it('connect wallet button text', async () => {
    await page.click(
      '#root > div > div > div > div.kima-card-footer > button.primary-button'
    )
    const text = await page.$eval(
      '#root > div > div > div > div.kima-card-content .wallet-button button',
      (e) => e.textContent
    )
    expect(text).toEqual('Connect Wallet')
  })

  it('connect wallet error text', async () => {
    const text = await page.$eval(
      '#root > div > div > div > div.kima-card-content .wallet-button p',
      (e) => e.textContent
    )
    expect(text).toEqual('Wallet not connected')
  })

  afterAll(() => browser.close())
})
