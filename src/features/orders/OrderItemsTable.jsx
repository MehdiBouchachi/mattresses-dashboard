import styled from "styled-components";
import { device } from "../../styles/breakpoints";

const Wrapper = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-200);
  border-radius: var(--border-radius-md);
  overflow: hidden;
`;

const Title = styled.h3`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-700);
  padding: 2.4rem 3.2rem 0;

  @media ${device.mobile} {
    padding: 2rem 1.6rem 0;
  }
`;

const TableWrapper = styled.div`
  overflow-x: auto;
  scroll-behavior: smooth;
`;

const StyledTable = styled.table`
  width: 100%;
  min-width: 600px;
  border-collapse: collapse;
  font-size: 1.4rem;
`;

const Thead = styled.thead`
  background-color: var(--color-grey-50);

  & th {
    padding: 1.2rem 2.4rem;
    text-align: left;
    font-weight: 600;
    font-size: 1.2rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--color-grey-600);
    border-bottom: 1px solid var(--color-grey-100);

    @media ${device.mobile} {
      padding: 1rem 1.2rem;
    }
  }
`;

const Tbody = styled.tbody`
  & tr:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Td = styled.td`
  padding: 1.4rem 2.4rem;
  color: var(--color-grey-700);
  font-weight: 500;

  @media ${device.mobile} {
    padding: 1rem 1.2rem;
  }
`;

const ProductName = styled.span`
  font-weight: 600;
  color: var(--color-grey-700);
`;

const Mono = styled.span`
  font-family: "Sono", monospace;
  font-weight: 600;
`;

function formatCurrency(value) {
  return new Intl.NumberFormat("fr-DZ").format(value) + " DA";
}

function OrderItemsTable({ items }) {
  if (!items || items.length === 0) return null;

  return (
    <Wrapper>
      <Title>Order Items</Title>

      <TableWrapper>
        <StyledTable>
          <Thead>
            <tr>
              <th>Product</th>
              <th>Size</th>
              <th>Thickness</th>
              <th>Price</th>
              <th>Qty</th>
              <th>Subtotal</th>
            </tr>
          </Thead>

          <Tbody>
            {items.map((item, index) => (
              <tr key={item.product_id || index}>
                <Td>
                  <ProductName>{item.name}</ProductName>
                </Td>
                <Td>{item.size} cm</Td>
                <Td>{item.thickness} cm</Td>
                <Td>
                  <Mono>{formatCurrency(item.price)}</Mono>
                </Td>
                <Td>{item.quantity}</Td>
                <Td>
                  <Mono>{formatCurrency(item.subtotal)}</Mono>
                </Td>
              </tr>
            ))}
          </Tbody>
        </StyledTable>
      </TableWrapper>
    </Wrapper>
  );
}

export default OrderItemsTable;
