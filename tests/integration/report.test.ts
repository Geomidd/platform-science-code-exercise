import {
  generateReport,
} from '../../src/report';

describe('Routing Report', () => {
  it('should have a numeric suitability score', () => {
    const destinations = ['123 Main St', '1234 Main St', '4242 Everything Drive'];
    const drivers = ['Bobby Tables', 'Rosa Murgatroyd', 'Jeffry Ferrero'];
    const report = generateReport(destinations, drivers);
    expect(report.suitabilityScore).toEqual(32.75);
  });

  it('should remain unchanged with extra, lower score driver', () => {
    const destinations = ['123 Main St', '1234 Main St', '4242 Everything Drive'];
    const drivers = ['Bobby Tables', 'Rosa Murgatroyd', 'Jeffry Ferrero', 'Bob Ross'];
    const report = generateReport(destinations, drivers);
    expect(report.suitabilityScore).toEqual(32.75);
  });

  it('should still assign routes when routes outnumber drivers', () => {
    const destinations = ['123 Main St', '1234 Main St', '4242 Everything Drive'];
    const drivers = ['Bobby Tables', 'Rosa Murgatroyd'];
    const report = generateReport(destinations, drivers);
    expect(report.suitabilityScore).toEqual(expect.any(Number));
  });
});
