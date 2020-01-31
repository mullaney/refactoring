import { expect } from "chai"
import { priceOrder } from "../src/priceOrder"

describe('#priceOrder', () => {
  it('is a function', () => {
    expect(typeof priceOrder).to.equal('function');
  })

  it('returns a number', () => {
    const product = {
      basePrice: 100,
      discountThreshold: 5,
      discountRate: .10
    };
    const quantity = 20;
    const shippingMethod = {
      discountThreshold: 20,
      discountFee: 7,
      feePerCase: 12
    }
    expect(typeof priceOrder(product, quantity, shippingMethod)).to.equal('number');
    expect(priceOrder(product, quantity, shippingMethod)).to.not.be.NaN;
  })

  context('with no discounts', () => {
    it('returns the correct value', () => {
      const product = {
        basePrice: 100,
        discountThreshold: 10,
        discountRate: .10
      };
      const quantity = 1;
      const shippingMethod = {
        discountThreshold: 500,
        discountFee: 7,
        feePerCase: 12
      }
      expect(priceOrder(product, quantity, shippingMethod)).to.equal(112);
    })
  })

  context('with a shipping discount', () => {
    it('returns the correct value', () => {
      const product = {
        basePrice: 100,
        discountThreshold: 10,
        discountRate: .10
      };
      const quantity = 6;
      const shippingMethod = {
        discountThreshold: 500,
        discountFee: 7,
        feePerCase: 12
      }
      expect(priceOrder(product, quantity, shippingMethod)).to.equal(642);
    })
  })

  context('with both discounts', () => {
    it('returns the correct value', () => {
      const product = {
        basePrice: 100,
        discountThreshold: 10,
        discountRate: .10
      };
      const quantity = 11;
      const shippingMethod = {
        discountThreshold: 500,
        discountFee: 7,
        feePerCase: 12
      }
      expect(priceOrder(product, quantity, shippingMethod)).to.equal(1167);
    })
  })
})