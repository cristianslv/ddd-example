# DDD Project

Este é um projeto de exemplo utilizando Domain-Driven Design (DDD) com TypeScript. O projeto inclui entidades, repositórios, serviços e eventos para gerenciar clientes, produtos e pedidos.

## Instalação

1. Clone o repositório:
    ```sh
    git clone <URL_DO_REPOSITORIO>
    ```
2. Navegue até o diretório do projeto:
    ```sh
    cd ddd
    ```
3. Instale as dependências:
    ```sh
    npm install
    ```

## Scripts Disponíveis

- `npm run test`: Executa os testes utilizando Jest.
- `npm run tsc`: Compila o projeto TypeScript.

## Configuração do Jest

O Jest é configurado no arquivo [jest.config.ts](jest.config.ts) para transformar arquivos TypeScript utilizando `@swc/jest`.

## Estrutura de Código

### Entidades

As entidades representam os objetos principais do domínio, como clientes, produtos e pedidos. Elas são definidas na pasta `src/domain`.

### Repositórios

Os repositórios são responsáveis por persistir e recuperar entidades do armazenamento. Eles são definidos na pasta `src/infrastructure`.

### Serviços

Os serviços contêm a lógica de negócios e operações que envolvem múltiplas entidades. Eles são definidos na pasta `src/domain`.

### Eventos

Os eventos são utilizados para notificar outras partes do sistema sobre mudanças de estado. Eles são definidos na pasta `src/domain/@shared/event`.

### Fábricas

As fábricas são responsáveis por criar instâncias de entidades complexas. Elas são definidas na pasta `src/domain`.

## Exemplo de Uso

### Criando um Pedido

```typescript
import OrderFactory from "./src/domain/checkout/factory/order.factory";

const orderProps = {
  customerId: "123",
  items: [
    { name: "Item 1", productId: "p1", quantity: 1, price: 100 },
    { name: "Item 2", productId: "p2", quantity: 2, price: 200 },
  ],
};

const order = OrderFactory.create(orderProps);

console.log(order);
```

## Contribuição
Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.

## Licença
Este projeto está licenciado sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.
