import {Component, EventEmitter, Output, ElementRef} from 'angular2/core';
import {Person} from '../models/person'
import {Team} from '../models/team'
import {State} from "../models/person";

// So TypeScript will let me use jqLite / jquery
declare var $: any; // TODO: "any" should really be JqueryWrapperObject, or whatever TypeScript / definitely typed calls it

// Types for working with Bootstrap popovers
type Callback = (Event) => void;
type ContentFn = () => string;
type CssSelector = string;
type EventName = string;
type PopoverCommand = string;
type PopoverPlacement = string; // 'top'|'bottom'|'left'|'right'|'auto'; (need TS 1.8 for string literal types, but that breaks angular2 :()
type PopoverPlacementFn = () => PopoverPlacement;
type PopoverTriggerType = string; // 'click'|'hover'|'focus'|'manual'; (need TS 1.8 for string literal types, but that breaks angular2 :()
type TitleFn = () => string;

interface DelayDescriptor {
    show: number;
    hide: number;
}

interface ViewportDescriptor {
    selector: CssSelector;
    padding: string;
}

type ViewportDescriptorFn = () => ViewportDescriptor;

interface PopoverOptions {
    animation?: boolean;
    container?: PopoverComponent|CssSelector|boolean;
    content?: string|ContentFn;
    delay?: number|DelayDescriptor;
    html?: boolean;
    placement?: PopoverPlacement|PopoverPlacementFn;
    selector?: CssSelector|boolean;
    template?: string;
    title?: string|TitleFn;
    trigger?: PopoverTriggerType;
    viewport?: string|ViewportDescriptor|ViewportDescriptorFn;
}

interface PopoverComponent /* extends JqueryWrapperObject */ {
    popover (commandOrOptions: PopoverCommand|PopoverOptions): PopoverComponent;

    // These would have been inherited from JqueryWrapperObject
    parent (): PopoverComponent; // JqueryWrapperObject
    find (s: CssSelector): PopoverComponent; // JqueryWrapperObject
    on (e: EventName, cb: Callback): PopoverComponent // JqueryWrapperObject
    one (e: EventName, cb: Callback): PopoverComponent // JqueryWrapperObject
}

@Component({
    styles: [],
    selector: 'developer',
    template: `
    <div class="input-group dev" *ngFor="#peep of peeps">
        <span class="input-group-addon" *ngIf="peep.shouldPair">
            <div class="cbx cbx-md cbx-active" tabindex="1000">
                <span class="cbx-icon">
                    <div [ngSwitch]="peep.state" id="popover-anchor-{{peep.name}}">
                        <template ngSwitchDefault><i class="glyphicon glyphicon-ok" (click)="onToggleCheckbox(peep,1)"></i></template>
                        <template [ngSwitchWhen]="1"><i class="glyphicon glyphicon-stop" (click)="onToggleCheckbox(peep,2)"></i></template>
                        <template [ngSwitchWhen]="2"><i class="glyphicon glyphicon-user" (click)="onToggleCheckbox(peep,3)"></i></template>
                        <template [ngSwitchWhen]="3"><i class="glyphicon glyphicon-remove" (click)="onToggleCheckbox(peep,0)"></i></template>
                    </div>
                </span>
            </div>
        </span>
        <div type="text" class="form-control" aria-label="...">{{displayPerson(peep)}}</div>
        <span class="input-group-addon">
            <button class="btn btn-default btn-sm dev-btn-switch glyphicon glyphicon-resize-horizontal" id="{{peep.name}}" (click)="emitTeamSwitch(peep)" role="button"></button>
        </span>
    </div>
    `,
    inputs: ['peeps', 'teamname'],
    outputs: ['onSwitchTeam']
})
export class Dev {
    public onSwitchTeam = new EventEmitter();
    public peeps: Person[];
    public teamname: string;

    private intentionalPairs: { [name: string]: Person };

    constructor (private el: ElementRef) {
        this.intentionalPairs = {};
    }

    /**
     * Perform side effects when a given peep's state changes
     */
    onToggleCheckbox (peep: Person, change: State): void {
        peep.state = change;

        if (change == State.IntentionalPairing) {
            this.popoverSpecificPairingOptions(peep);
        } else {
            this.intentionalPairingPopover(peep).popover('hide');
            this.removeIntentionalPairOf(peep);
        }
    }

    /**
     * Given a peep, return a string describing her and/or with whom she's intentionally pairing
     */
    displayPerson (peep: Person): string {
        let otherPeep = this.getIntentionalPairOf(peep);

        if (otherPeep) {
            return `${peep.name} & ${otherPeep.name}`;
        } else {
            return peep.name;
        }
    }

    /**
     * Notify that the given peep is switching off of the current team
     */
    emitTeamSwitch (peep: Person): void {
        this.removeIntentionalPairOf(peep);
        peep.state = State.RandomPairing;
        this.onSwitchTeam.emit({ name: peep.name, team: this.teamname });
    }

    /**
     * Given the first half of an intentional pair, return a function that takes the other half.
     * That function returns a pair of the markup to display a link to the other half of the pair,
     * and the code to run when that link is clicked.
     *
     * Because the dynamically generated intentional pair popovers are generated,
     * the onclicks will be assigned to the handle one click of the links, just in time.
     */
    private markupOnclickMapPair (peep: Person): (otherPeep: Person) => [string, { name: string, onclick: () => void }] {
        return (otherPeep: Person) => {
            // The id in the <li> tag here is important, popoverSpecificPairingOptions uses it
            // to find the right link which to assign the click handler
            let markup = `<li id="${otherPeep.name}"><a href="#">${otherPeep.name}</a></li>`;
            return [markup, { name: otherPeep.name, onclick: () => this.assignIntentionalPair(peep, otherPeep) }];
        };
    }

    /**
     * For a given Person, display a popover showing everyone else on the team that she can pair with
     */
    private popoverSpecificPairingOptions (peep: Person): void {
        let popoverAnchor = this.intentionalPairingPopover(peep);
        let otherPeeps = this.peeps.filter(p => p.shouldPair && p.name != peep.name);

        let markupOnclickMapPairs = otherPeeps.map(this.markupOnclickMapPair(peep));
        let [markups, onclickMaps] = unzip(markupOnclickMapPairs);

        // Configure the popover: Treat the contents as html, not text; Only code will trigger the showing / hiding
        popoverAnchor.popover(<PopoverOptions>{
            html: true,
            trigger: 'manual',
            title: `Set ${peep.name} to Pair With...`,
            content: `<ul>${markups.join('')}</ul>`,
            container: popoverAnchor
        });

        // Show the popover, asynchronously
        popoverAnchor.popover('show');

        // When the popover is shown, wire up on the onclicks
        popoverAnchor.parent().on('shown.bs.popover', () => { onclickMaps.forEach(
            ({name, onclick}) => popoverAnchor
                .find(`#${name}`)
                .one('click', compose(() => popoverAnchor.popover('hide'), onclick)))
        });
    }

    /**
     * Return the element representing the intentional pairing popover for the given peep
     */
    private intentionalPairingPopover (peep: Person): PopoverComponent {
        return $(this.el.nativeElement).find(`#${`popover-anchor-${peep.name}`}`);
    }

    /**
     * Put the given peeps together in an intentional pair, removing any other intentional pairs they were previously in
     */
    private assignIntentionalPair (peep: Person, otherPeep: Person): void {
        this.removeIntentionalPairOf(peep);
        this.removeIntentionalPairOf(otherPeep);

        peep.state = State.IntentionalPairing;
        otherPeep.state = State.IntentionalPairing;

        this.intentionalPairs[peep.name] = otherPeep;
        this.intentionalPairs[otherPeep.name] = peep;
    }

    /**
     * Remove the given peep from whatever intentional pair she was in
     */
    private removeIntentionalPairOf (peep: Person): void {
        let otherPeep: Person = this.intentionalPairs[peep.name];

        if (otherPeep) {
            otherPeep.state = State.RandomPairing;
            delete this.intentionalPairs[this.intentionalPairs[peep.name].name];
        }

        delete this.intentionalPairs[peep.name];
    }

    /**
     * Return the other peep that the given peep is intentionally pairing with, if any
     */
    private getIntentionalPairOf (peep: Person): Person {
        return this.intentionalPairs[peep.name];
    }
}

// Local helper functions

/**
 * Compose two functions
 */
function compose (f, g) {
    return function (...args) {
        f(g(...args));
    };
}

/**
 * Given an array of pairs, return a pair of arrays
 *
 * e.g.: when you pass this to unzip,
 *
 * [['foo', 1], ['bar', 2], ['baz', 3], ['qux', 4]]
 *
 * you'll get this back:
 *
 * [['foo', 'bar', 'baz', 'qux'], [1, 2, 3, 4]]
 */
function unzip <T, U> (vs: [T, U][]): [T[], U[]] {
    return vs.reduce<[T[], U[]]>((acc: [T[], U[]], v: [T, U]): [T[], U[]] => {
        let [ts, us] = acc;
        let [t, u] = v;
        return [ts.concat(t), us.concat(u)];
    }, [<T[]>[], <U[]>[]]);
}
