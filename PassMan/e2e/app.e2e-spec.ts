import { PassPage } from './app.po';

describe('pass App', () => {
  let page: PassPage;

  beforeEach(() => {
    page = new PassPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
