import React from 'react';
import ReactDOM from 'react-dom/client';
import { act } from 'react';
import App from './App';
import CollageGridSlider from './components/ui/CollageGridSlider';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const root = ReactDOM.createRoot(div);
  root.render(<App />);
  root.unmount();
});

it('renders CollageGridSlider with visible images from index 0', () => {
  const div = document.createElement('div');
  const root = ReactDOM.createRoot(div);
  const sampleSlides = [
    { id: '1', image: '/grid_slides/grid_slide_default.jpg' },
    { id: '2', image: '/grid_slides/grid_slide_default.jpg' }
  ];

  act(() => {
    root.render(<CollageGridSlider slides={sampleSlides} />);
  });

  const cards = div.querySelectorAll('.grid-slide-card');
  expect(cards.length).toBeGreaterThan(10);

  const images = div.querySelectorAll('.collage-grid-img');
  expect(images.length).toBeGreaterThan(10);
  expect(images[0].getAttribute('src')).toBe('/grid_slides/grid_slide_default.jpg');
  expect(images[0].getAttribute('loading')).toBe('eager');

  const track = div.querySelector('.collage-grid-slider-track');
  expect(track).not.toBeNull();
  expect(track.style.transform).toBe('translateX(-0px)');

  root.unmount();
});

it('supports adding and deleting slides in ContentProvider', () => {
  const { ContentProvider, useContent } = require('./context/ContentContext');
  let testApi;
  const TestComponent = () => {
    testApi = useContent();
    return <div>Test</div>;
  };

  const div = document.createElement('div');
  const root = ReactDOM.createRoot(div);
  act(() => {
    root.render(
      <ContentProvider>
        <TestComponent />
      </ContentProvider>
    );
  });

  expect(testApi.collageSlides.length).toBeGreaterThan(0);
  const initialLength = testApi.collageSlides.length;

  // Add slide
  act(() => {
    testApi.addCollageSlide({ image: '/test.jpg' });
  });
  expect(testApi.collageSlides.length).toBe(initialLength + 1);

  // Delete slide by index
  act(() => {
    testApi.deleteCollageSlide(null, testApi.collageSlides.length - 1);
  });
  expect(testApi.collageSlides.length).toBe(initialLength);

  root.unmount();
});

