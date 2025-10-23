import React from 'react';
import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { LoaderProvider, useLoader } from './LoaderContext';

// Componente de prueba para usar el hook
function TestComponent() {
  const { isLoading, message, showLoader, hideLoader, updateMessage } = useLoader();

  return (
    <div>
      <div data-testid="loading-status">{isLoading ? 'loading' : 'not-loading'}</div>
      <div data-testid="loading-message">{message}</div>
      <button data-testid="show-loader" onClick={() => showLoader()}>
        Show Loader
      </button>
      <button data-testid="show-loader-custom" onClick={() => showLoader('Cargando datos...')}>
        Show Loader Custom
      </button>
      <button data-testid="hide-loader" onClick={() => hideLoader()}>
        Hide Loader
      </button>
      <button data-testid="update-message" onClick={() => updateMessage('Nuevo mensaje')}>
        Update Message
      </button>
    </div>
  );
}

describe('LoaderContext', () => {
  describe('LoaderProvider', () => {
    it('should provide initial loader state', () => {
      render(
        <LoaderProvider>
          <TestComponent />
        </LoaderProvider>
      );

      expect(screen.getByTestId('loading-status')).toHaveTextContent('not-loading');
      expect(screen.getByTestId('loading-message')).toHaveTextContent('Cargando...');
    });

    it('should show loader with default message', () => {
      render(
        <LoaderProvider>
          <TestComponent />
        </LoaderProvider>
      );

      const showButton = screen.getByTestId('show-loader');
      
      act(() => {
        showButton.click();
      });

      expect(screen.getByTestId('loading-status')).toHaveTextContent('loading');
      expect(screen.getByTestId('loading-message')).toHaveTextContent('Cargando...');
    });

    it('should show loader with custom message', () => {
      render(
        <LoaderProvider>
          <TestComponent />
        </LoaderProvider>
      );

      const showButton = screen.getByTestId('show-loader-custom');
      
      act(() => {
        showButton.click();
      });

      expect(screen.getByTestId('loading-status')).toHaveTextContent('loading');
      expect(screen.getByTestId('loading-message')).toHaveTextContent('Cargando datos...');
    });

    it('should hide loader', () => {
      render(
        <LoaderProvider>
          <TestComponent />
        </LoaderProvider>
      );

      const showButton = screen.getByTestId('show-loader');
      const hideButton = screen.getByTestId('hide-loader');
      
      // Primero mostrar el loader
      act(() => {
        showButton.click();
      });

      expect(screen.getByTestId('loading-status')).toHaveTextContent('loading');

      // Luego ocultarlo
      act(() => {
        hideButton.click();
      });

      expect(screen.getByTestId('loading-status')).toHaveTextContent('not-loading');
    });

    it('should update message without changing loading state', () => {
      render(
        <LoaderProvider>
          <TestComponent />
        </LoaderProvider>
      );

      const updateButton = screen.getByTestId('update-message');
      
      act(() => {
        updateButton.click();
      });

      expect(screen.getByTestId('loading-status')).toHaveTextContent('not-loading');
      expect(screen.getByTestId('loading-message')).toHaveTextContent('Nuevo mensaje');
    });

    it('should update message while loading', () => {
      render(
        <LoaderProvider>
          <TestComponent />
        </LoaderProvider>
      );

      const showButton = screen.getByTestId('show-loader');
      const updateButton = screen.getByTestId('update-message');
      
      // Mostrar loader
      act(() => {
        showButton.click();
      });

      expect(screen.getByTestId('loading-status')).toHaveTextContent('loading');

      // Actualizar mensaje
      act(() => {
        updateButton.click();
      });

      expect(screen.getByTestId('loading-status')).toHaveTextContent('loading');
      expect(screen.getByTestId('loading-message')).toHaveTextContent('Nuevo mensaje');
    });
  });

  describe('useLoader hook', () => {
    it('should throw error when used outside LoaderProvider', () => {
      // Suprimir console.error para esta prueba
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

      expect(() => {
        render(<TestComponent />);
      }).toThrow('useLoader debe ser usado dentro de un LoaderProvider');

      consoleSpy.mockRestore();
    });

    it('should return correct context value', () => {
      let contextValue: ReturnType<typeof useLoader> | null = null;

      function TestHook() {
        contextValue = useLoader();
        return null;
      }

      render(
        <LoaderProvider>
          <TestHook />
        </LoaderProvider>
      );

      expect(contextValue).toHaveProperty('isLoading', false);
      expect(contextValue).toHaveProperty('message', 'Cargando...');
      expect(contextValue).toHaveProperty('showLoader');
      expect(contextValue).toHaveProperty('hideLoader');
      expect(contextValue).toHaveProperty('updateMessage');
      expect(typeof contextValue!.showLoader).toBe('function');
      expect(typeof contextValue!.hideLoader).toBe('function');
      expect(typeof contextValue!.updateMessage).toBe('function');
    });
  });

  describe('LoaderContext integration', () => {
    it('should handle multiple state changes correctly', () => {
      render(
        <LoaderProvider>
          <TestComponent />
        </LoaderProvider>
      );

      const showButton = screen.getByTestId('show-loader-custom');
      const hideButton = screen.getByTestId('hide-loader');
      const updateButton = screen.getByTestId('update-message');

      // Estado inicial
      expect(screen.getByTestId('loading-status')).toHaveTextContent('not-loading');
      expect(screen.getByTestId('loading-message')).toHaveTextContent('Cargando...');

      // Mostrar con mensaje personalizado
      act(() => {
        showButton.click();
      });

      expect(screen.getByTestId('loading-status')).toHaveTextContent('loading');
      expect(screen.getByTestId('loading-message')).toHaveTextContent('Cargando datos...');

      // Actualizar mensaje mientras carga
      act(() => {
        updateButton.click();
      });

      expect(screen.getByTestId('loading-status')).toHaveTextContent('loading');
      expect(screen.getByTestId('loading-message')).toHaveTextContent('Nuevo mensaje');

      // Ocultar loader
      act(() => {
        hideButton.click();
      });

      expect(screen.getByTestId('loading-status')).toHaveTextContent('not-loading');
      expect(screen.getByTestId('loading-message')).toHaveTextContent('Nuevo mensaje');
    });

    it('should handle Spanish loading messages correctly', () => {
      render(
        <LoaderProvider>
          <TestComponent />
        </LoaderProvider>
      );

      const showButton = screen.getByTestId('show-loader-custom');
      
      act(() => {
        showButton.click();
      });

      expect(screen.getByTestId('loading-message')).toHaveTextContent('Cargando datos...');
    });
  });
});