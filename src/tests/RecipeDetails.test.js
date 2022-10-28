import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import { getStorage } from '../helpers/Storage';
import renderWithRouter from './utils/renderWith';

describe('Testar a barra de navegação', () => {
  it('testar first letter em drinks', async () => {
    const { history } = renderWithRouter(<App />, {
      initialEntries: ['/meals'],
    });
    await waitFor(() => {
      const {
        location: { pathname },
      } = history;
      const burek = screen.getByTestId('1-card-name');
      userEvent.click(burek);
      expect(pathname).toBe('/meals/53060');
    });
    const shareBtn = screen.getByTestId('share-btn');
    userEvent.click(shareBtn);
    const sharelink = screen.getByText(/link copied!/i);
    expect(sharelink).toBeInTheDocument();
    const favoritar = screen.getByRole('img', {
      name: /icone de favoritar/i,
    });
    userEvent.click(favoritar);
    const localStorageitem = getStorage();
    expect(localStorageitem).toBe(
      '{"id":"53060","type":"meals","nationality":"Croatian","category":"Side","name":"Burek","image":"https://www.themealdb.com/images/media/meals/tkxquw1628771028.jpg"}',
    );

    // waitFor;share-btn
  });
});
