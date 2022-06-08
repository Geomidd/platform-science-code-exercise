import {
  generateReport,
} from '../../src/report';

describe('Util functions', () => {

});

describe('Routing Report', () => {
  it('should have a numeric suitability score', () => {
    const destinations = ['123 Main St', '1234 Main St', '4242 Everything Drive'];
    const drivers = ['Bobby Tables', 'Rosa Murgatroyd', 'Jeffry Ferrero'];
    const report = generateReport(destinations, drivers);
    expect(report.suitabilityScore).toEqual(expect.any(Number));
  });
});
