import { Mean2starterPage } from './app.po';

describe('mean2starter App', () => {
  let page: Mean2starterPage;

  beforeEach(() => {
    page = new Mean2starterPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
