import { beforeEach, describe, expect, test } from 'vitest';
import AxiosMockAdapter from 'axios-mock-adapter';

import { getHeroAction } from './get-hero.action';
import { heroApi } from '../api/hero.api';

const BASE_URL = import.meta.env.VITE_API_URL;

const supermanResponse = {
  id: '1',
  name: 'Clark Kent',
  slug: 'clark-kent',
  alias: 'Superman',
  powers: [
    'Súper fuerza',
    'Vuelo',
    'Visión de calor',
    'Visión de rayos X',
    'Invulnerabilidad',
    'Súper velocidad',
  ],
  description:
    'El Último Hijo de Krypton, protector de la Tierra y símbolo de esperanza para toda la humanidad.',
  strength: 10,
  intelligence: 8,
  speed: 9,
  durability: 10,
  team: 'Liga de la Justicia',
  image: '1.jpeg',
  firstAppearance: '1938',
  status: 'Active',
  category: 'Hero',
  universe: 'DC',
};

describe('getHeroAction', () => {
  const heroesApiMock = new AxiosMockAdapter(heroApi);

  beforeEach(() => {
    heroesApiMock.reset();
  });

  test('should fetch hero data and return with complete image url', async () => {
    heroesApiMock.onGet('/clark-kent').reply(200, supermanResponse);

    const result = await getHeroAction('clark-kent');

    expect(result.image).toContain('http');
    expect(result).toStrictEqual({
      ...supermanResponse,
      image: `${BASE_URL}/images/1.jpeg`,
    });
  });

  test('should throw an error if hero is not found', async () => {
    heroesApiMock.onGet('/batman-2').reply(404);

    await expect(getHeroAction('batman-2')).rejects.toThrow(
      'Request failed with status code 404'
    );
  });
});
