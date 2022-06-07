# Platform Science Code Exercise

## Getting Started

### Run

### Test

## Description
Our sales team has just struck a deal with Acme Inc to become the exclusive provider for routing their product shipments via 3rd party trucking fleets. The catch is that we can only route one shipment to one driver per day.

Each day we get the list of shipment destinations that are available for us to offer to drivers in our network. Fortunately our team of highly trained data scientists have developed a mathematical model for determining which drivers are best suited to deliver each shipment.

With that hard work done, now all we have to do is implement a program that assigns each shipment destination to a given driver while maximizing the total suitability of all shipments to all drivers.

The top-secret algorithm is:

- If the length of the shipment's destination street name is even, the base suitability score (SS) is the number of vowels in the driver’s name multiplied by 1.5.
- If the length of the shipment's destination street name is odd, the base SS is the number of consonants in the driver’s name multiplied by 1.
- If the length of the shipment's destination street name shares any common factors (besides 1) with the length of the driver’s name, the SS is increased by 50% above the base SS.

### Inputs

CLI with two files with newline separated lists (guaranteed to not be malformed but not case consistent)
1. Street addresses of shipment destinations
1. Names of drivers

### Outputs

JSON file named `output/routing-YYYYMMDD.json` with format 
```
{
  "totalSustainabilityScore": 0,
  "routings": [
    {
      "driver": "Driver Name",
      "destination": "123 Main Street"
    }
  ]
}
```
