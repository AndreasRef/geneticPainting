// Create the population
function Population(m, num) {
  this.mutationRate = m; // Mutation rate
  this.population = []; // array to hold the current population
  this.matingPool = [];
  this.generations = 0; // Number of generations
  for (var i = 0; i < num; i++) {
    //if (floor(i/rows))
    this.population[i] = new Painting(new DNA(), rectWidth / 2 + (i % rows) * (rectWidth + spacing) + spacing, rectHeight / 2 + spacing + floor(i / rows) * (rectHeight + spacing));
  }

  // Display all paintings
  this.display = function() {
    for (var i = 0; i < this.population.length; i++) {
      this.population[i].display();
    }
  }

  // Are we rolling over any of the paintings?
  this.rollover = function(mx, my) {
    if (this.population.length > 1) { //Only if there are more than one in the population
      for (var i = 0; i < this.population.length; i++) {
        this.population[i].rollover(mx, my);
      }
    }
  }

  // Generate a mating pool
  this.selection = function() {
    // Clear the ArrayList
    this.matingPool = [];

    // Calculate total fitness of whole population
    var maxFitness = this.getMaxFitness();

    // Calculate fitness for each member of the population (scaled to value between 0 and 1)
    // Based on fitness, each member will get added to the mating pool a certain number of times
    // A higher fitness = more entries to mating pool = more likely to be picked as a parent
    // A lower fitness = fewer entries to mating pool = less likely to be picked as a parent
    for (var i = 0; i < this.population.length; i++) {
      var fitnessNormal = map(this.population[i].getFitness(), 0, maxFitness, 0, 1);
      var n = floor(fitnessNormal * 100); // Arbitrary multiplier

      for (var j = 0; j < n; j++) {
        this.matingPool.push(this.population[i]);
      }
    }
  }

  // Making the next generation
  this.reproduction = function() {

    if (this.population.length > 1) { //Keep reducing the population untill only one is left

      //Sloppy hardcoding
      if (this.population.length == 16) {
        this.population = shorten(this.population);
        this.population = shorten(this.population);
        this.population = shorten(this.population);
        this.population = shorten(this.population);
        this.population = shorten(this.population);
        this.population = shorten(this.population);
        this.population = shorten(this.population);
      rectWidth *= 1.4;
      rectHeight *= 1.4;
        
      } else if (this.population.length == 9) {
        this.population = shorten(this.population);
        this.population = shorten(this.population);
        this.population = shorten(this.population);
        this.population = shorten(this.population);
        this.population = shorten(this.population);
      rectWidth *= 1.6;
      rectHeight *= 1.6;
        
      } else if (this.population.length == 4) {
        this.population = shorten(this.population);
        this.population = shorten(this.population);
        this.population = shorten(this.population);
      rectWidth *= 1.9;
      rectHeight *= 1.9;
        
      }

      rows--;
      columns--;

      // Refill the population with children from the mating pool
      for (var i = 0; i < this.population.length; i++) {
        // Sping the wheel of fortune to pick two parents
        var m = floor(random(this.matingPool.length));
        var d = floor(random(this.matingPool.length));
        // Pick two parents
        var mom = this.matingPool[m];
        var dad = this.matingPool[d];
        // Get their genes
        var momgenes = mom.getDNA();
        var dadgenes = dad.getDNA();
        // Mate their genes
        var child = momgenes.crossover(dadgenes);
        // Mutate their genes
        child.mutate(this.mutationRate);
        // Fill the new population with the new child

        this.population[i] = new Painting(child, rectWidth / 2 + (i % rows) * (rectWidth + spacing) + spacing, rectHeight / 2 + spacing + floor(i / rows) * (rectHeight + spacing));
      }
      this.generations++;
    } else if (this.population.length == 1) {

      rows = 4;
      columns = 4;
      rectWidth = rectWidthStart;
      rectHeight = rectHeightStart;
      this.generations = 0;

      for (var i = 0; i < rows * columns; i++) {
        this.population[i] = new Painting(new DNA(), rectWidth / 2 + (i % rows) * (rectWidth + spacing), rectHeight / 2 + spacing + floor(i / rows) * (rectHeight + spacing));
      
      }
    }
  }

  this.getGenerations = function() {
    return this.generations;
  }

  // Find highest fitness for the population
  this.getMaxFitness = function() {
    var record = 0;
    for (var i = 0; i < this.population.length; i++) {
      if (this.population[i].getFitness() > record) {
        record = this.population[i].getFitness();
      }
    }
    return record;
  }
}