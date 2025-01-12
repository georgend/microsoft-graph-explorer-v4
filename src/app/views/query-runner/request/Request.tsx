import { getId, Icon, Pivot, PivotItem, TooltipHost } from 'office-ui-fabric-react';
import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';

import { Mode } from '../../../../types/enums';
import { IRequestComponent } from '../../../../types/request';
import { Monaco } from '../../common/monaco/Monaco';
import { Auth } from './auth';
import { RequestHeaders } from './headers';
import { Permission } from './permissions';
import './request.scss';

export class Request extends Component<IRequestComponent, any> {
  constructor(props: IRequestComponent) {
    super(props);
  }

  private getPivotItems = () => {

    const {
      handleOnEditorChange,
      sampleBody,
      mode,
      mobileScreen,
      intl: { messages },
    }: any = this.props;

    const pivotItems = [
      <PivotItem
        key='request-body'
        itemIcon='Send'
        onRenderItemLink={this.getTooltipDisplay}
        title={messages['request body']}
        headerText={(mobileScreen) ? '' : messages['request body']}>
        <Monaco
          body={sampleBody}
          onChange={(value) => handleOnEditorChange(value)} />
      </PivotItem>,
      <PivotItem
        key='request-header'
        itemIcon='FileComment'
        onRenderItemLink={this.getTooltipDisplay}
        title={messages['request header']}
        headerText={(mobileScreen) ? '' : messages['request header']}>
        <RequestHeaders />
      </PivotItem>,
      <PivotItem
        key='permissions'
        itemIcon='AzureKeyVault'
        onRenderItemLink={this.getTooltipDisplay}
        title={messages['modify permissions']}
        headerText={(mobileScreen) ? '' : messages['modify permissions']}>
        <Permission />
      </PivotItem>
    ];

    if (mode === Mode.Complete) {
      pivotItems.push(
        <PivotItem
          key='auth'
          itemIcon='AuthenticatorApp'
          onRenderItemLink={this.getTooltipDisplay}
          title={messages['Access Token']}
          headerText={(mobileScreen) ? '' : messages['Access Token']}>
          <Auth />
        </PivotItem>
      );
    }

    return pivotItems;
  };

  private getTooltipDisplay(link: any) {
    return (
      <TooltipHost content={link.title} id={getId()} calloutProps={{ gapSpace: 0 }}>
        <Icon iconName={link.itemIcon} style={{ paddingRight: 5 }} />
        {link.headerText}
      </TooltipHost>
    );
  }

  public render() {

    const requestPivotItems = this.getPivotItems();

    return (
      <div className='request-editors'>
        <Pivot>
          {requestPivotItems}
        </Pivot>
      </div>
    );

  }
}

function mapStateToProps(state: any) {
  return {
    mode: state.graphExplorerMode,
    sampleBody: state.sampleQuery.sampleBody,
    theme: state.theme,
    mobileScreen: !!state.sidebarProperties.mobileScreen
  };
}

// @ts-ignore
const IntlRequest = injectIntl(Request);
export default connect(mapStateToProps, null)(IntlRequest);
