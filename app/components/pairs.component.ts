import {Component}              from 'angular2/core';

@Component({
  styles:[],
  selector: 'pairs-section',
  template: `
    
    <!-- Pairs Section -->
    <section class="success" id="about">
        <div class="container">
            <div class="row">
                <div class="col-sm-6 text-center">
                    <h3>Pairs</h3>
                    <hr class="star-light">
                    <ul>
                        <li>Steve : Nils</li>
                    </ul>
                </div>
                <div class="col-sm-6 text-center">
                    <h3>Odd</h3>
                    <hr class="star-light">
                    <ul>
                        <li>Steve : Nils</li>
                    </ul>
                </div>
            </div>

        </div>
    </section>
    
  `
})
export class Pairs {
  
  
  constructor() { }
  
}
