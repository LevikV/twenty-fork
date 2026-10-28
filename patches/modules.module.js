"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ModulesModule", {
    enumerable: true,
    get: function() {
        return ModulesModule;
    }
});
const _common = require("@nestjs/common");
const _calendarmodule = require("./calendar/calendar.module");
const _connectedaccountmodule = require("./connected-account/connected-account.module");
const _messagingmodule = require("./messaging/messaging.module");
const _notificationmodule = require("./notification/notification.module");
const _onboardinginvitesuggestionsmodule = require("./onboarding-invite-suggestions/onboarding-invite-suggestions.module");
const _workflowmodule = require("./workflow/workflow.module");
const _workspacemembermodule = require("./workspace-member/workspace-member.module");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let ModulesModule = class ModulesModule {
};
ModulesModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _messagingmodule.MessagingModule,
            _calendarmodule.CalendarModule,
            _connectedaccountmodule.ConnectedAccountModule,
            _notificationmodule.NotificationModule,
            _onboardinginvitesuggestionsmodule.OnboardingInviteSuggestionsModule,
            _workflowmodule.WorkflowModule,
            _workspacemembermodule.WorkspaceMemberModule
        ],
        providers: [],
        exports: []
    })
], ModulesModule);
