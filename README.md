# AAVE TRU Web3

Despliegue en Fleek:  https://royal-silence-2070.on.fleek.co

## **Parte 1: Patrones de Diseño**

**[Design patterns](https://syndelltech.com/react-design-patterns-2023/)**

## Estructura y Justificación de Patrones de Diseño en el Proyecto

Este proyecto adopta dos patrones de diseño de React fundamentales para estructurar el código de manera eficiente y efectiva:

## Componentes Presentacionales

- **Ubicación**: `components/ui`
- **Ejemplos**: `button.tsx`, `card.tsx`, `input.tsx`, `label.tsx`, `tabs.tsx`
- **Justificación**: 
  - Crear componentes enfocados en la UI, que son reutilizables y no dependen de la lógica del negocio.
  - Facilitar la prueba y el mantenimiento de estos componentes.
  - Promover la reutilización en diferentes partes de la aplicación.

## Componentes de Contenedor

- **Ubicación**: `components/Swap`
- **Ejemplos**: `BorrowCard.tsx`, `DepositCard.tsx`, `TabsSection.tsx`
- **Justificación**: 
  - Manejar la lógica y el estado de la aplicación.
  - Separar la lógica de negocio de la UI, lo que resulta en una mejor organización del código.
  - Gestionar la complejidad de la aplicación y facilitar su mantenimiento.

## Beneficios de la Estructura Adoptada

- **Claridad y Definición**: Proporciona una arquitectura clara donde los roles de cada componente están bien delimitados.
- **Mantenibilidad y Legibilidad**: Mejora la mantenibilidad del código y facilita su comprensión.
- **Eficiencia en el Desarrollo**: Reduce la probabilidad de errores y hace el proceso de desarrollo más eficiente.
- **Escalabilidad y Colaboración**: Facilita la comprensión del código por parte de nuevos desarrolladores y mejora la escalabilidad del proyecto.


## **Parte 2: Testing**

**[Patrón AAA](https://jaguhiremath62.medium.com/arrange-act-and-assert-aaa-pattern-in-unit-testing-b2d261aaef6a)**

# Patrón AAA (Arrange-Act-Assert) para Pruebas Unitarias

El patrón AAA se ha seleccionado para estructurar nuestras pruebas unitarias, ofreciendo claridad y eficiencia en el proceso de prueba. A continuación, se detalla cada fase del patrón:

# Aplicación del Patrón AAA en Pruebas Unitarias de React

El patrón AAA (Arrange-Act-Assert) se aplica en las pruebas unitarias de nuestro proyecto de React de la siguiente manera:

## Arrange (Organizar)
- Inicialización de props, estados y contextos para componentes o funciones.
- Configuración de mocks para dependencias como llamadas a la API.

## Act (Actuar)
- Renderizado de componentes con herramientas como React Testing Library.
- Ejecución de funciones con argumentos necesarios.

## Assert (Afirmar)
- Verificación de comportamientos esperados en componentes (ej., renderizado correcto).
- Comprobación de resultados esperados en funciones.

### Ejemplo
- **Organizar**: Preparar props para el componente `Navbar`.
- **Actuar**: Renderizar `Navbar` y simular interacciones del usuario.
- **Afirmar**: Comprobar la correcta visualización de elementos en `Navbar`.


## **Parte 3:Integracion con AAVE**

- La app permite el mintear y visualizar   USDC-TestnetMintableERC20-Polygon proporcionado por [aave](https://docs.aave.com/developers/deployed-contracts/v3-testnet-addresses)

- Mediante el uso del contrato Pool de AAVE, se depositará capital en el protocolo y se recibirán USDC-ATokens como prueba de los activos depositados.




## Iniciar la app 🏄

Prerequisitos: [Node (v19 LTS)](https://nodejs.org/en/download/) and [Git](https://git-scm.com/downloads)

>Renombrar y reemplazar variables de entorno
```
mv .env.example .env
```
> Clonar repositorio

```
git clone https://github.com/RookieCol/TRU
```
> Instalar Dependencias:

```
yarn
```

> Iniciar proyecto:

```
yarn dev
```

## Autor 🏗

[RookieCol](https://github.com/RookieCol)
