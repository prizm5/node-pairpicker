import {Component}              from 'angular2/core';

@Component({
  styles:[],
  selector: 'teams-section',
  template: ` 
   <!-- Portfolio Grid Section -->
    <section id="portfolio">
        <div class="container">
            <div class="row">
                <div class="col-lg-12 text-center">
                    <h2>Workflows</h2>
                    <hr class="star-primary">
                </div>
           
            <div class="col-sm-4 portfolio-item">
                <h3>V5 Dev</h3>
                <hr />
                <div class="input-group dev">
                    <span class="input-group-addon">
                        <div class="cbx-container">
                            <div class="cbx cbx-md cbx-active" tabindex="1000">
                                <span class="cbx-icon">
                                    <i class="glyphicon glyphicon-ok"></i>
                                </span>
                            </div>
                            <div>
                                <input type="checkbox" class="names" value="1" id="Keith" checked="checked" aria-label="..." style="display: none;">
                            </div>
                        </div>
                    </span>
                    <div type="text" class="form-control" aria-label="...">Keith</div>
                    <span class="input-group-addon">
                        <a href="#" class="btn btn-default btn-sm dev-btn-switch" id="Keith" role="button">--&gt;</a>
                    </span>
                </div>
            </div>
            <div class="col-sm-4 portfolio-item">
                <h3>Cloud</h3>
                <hr />
                <div class="input-group dev">
                    <span class="input-group-addon">
                        <a href="#" class="btn btn-default btn-sm dev-btn-switch" id="Keith" role="button">&lt;--</a>
                    </span>
                    <div type="text" class="form-control" aria-label="...">Keith</div>
                    
                </div>
            </div>
             </div>
            <div class="row">
                <div class="col-sm-4 portfolio-item">
                    <button type="submit" class="btn btn-success btn-lg">Generate</button>
                </div>
            </div>
            
        </div>
    </section>
    
  `
})
export class Teams {
  
  
  constructor() { }
  
}
