//--------------------------ウィンドウ作成--------------------------------
function Window_VariableHUD() {
    this.initialize.apply(this, arguments);
}

Window_VariableHUD.prototype = Object.create(Window_Base.prototype);
Window_VariableHUD.prototype.constructor = Window_Gold;

Window_VariableHUD.prototype.initialize = function(x, y) {
    var width = this.windowWidth();
    var height = this.windowHeight();
    Window_Base.prototype.initialize.call(this, x, y, width, height);
    this.refresh();
};

Window_VariableHUD.prototype.windowWidth = function() {
    return 500;
};

Window_VariableHUD.prototype.windowHeight = function() {
    return 300;
};

//------------------------テキスト表示---------------------
Window_VariableHUD.prototype.refresh = function() {
    this.contents.clear();
    var color1 = this.textColor(16);
    var color2 = this.textColor(17);
    if ($gameVariables.value(1) >= 100){
        $gameVariables.setValue(1, 100);
}
    this.drawGauge(0, 10, 100, $gameVariables.value(1) / 100, color1, color2);
    this.drawText('スタミナ', 0, 0, 50);// (横、縦,長さ)
    this.drawCurrentAndMax($gameVariables.value(1), 100, 0, 0, 100, 
                           this.normalColor(), this.normalColor());// (最小値,最大値,横,縦、長さ、色、色）
};

Window_VariableHUD.prototype.open = function() {
    this.refresh();
    Window_Base.prototype.open.call(this);
};

//----------------------------------------------------------------------------------------------
var ori_map_start = Scene_Map.prototype.start
Scene_Map.prototype.start = function() {
    ori_map_start.call(this);
    this.createVariableWindow();
};

Scene_Map.prototype.createVariableWindow = function(){
    this._varWindow = new Window_VariableHUD();
    this._varWindow.opacity = 0;
    this.addWindow(this._varWindow);
}

var ori_map_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {
    ori_map_update.call(this);
    this._varWindow.refresh();
};

Window_VariableHUD.prototype.drawGauge = function(x, y, width, rate, color1, color2) {
    var fillW = Math.floor(width * rate);
    var gaugeY = y + this.lineHeight() - 8;
    this.contents.fillRect(x, gaugeY, width, 12, this.gaugeBackColor());
    this.contents.gradientFillRect(x, gaugeY, fillW, 12, color1, color2);
};


//Window_VariableHUD.prototype.drawActorHp = function(actor, x, y, width) {
//    width = width || 186;
//    var color1 = this.hpGaugeColor1();
//    var color2 = this.hpGaugeColor2();
//    this.drawGauge(x, y, width, actor.hpRate(), color1, color2);
 //   this.changeTextColor(this.systemColor());
 //   this.drawText(TextManager.hpA, x, y, 44);
 //   this.drawCurrentAndMax(actor.hp, actor.mhp, x, y, width,
 //                          this.hpColor(actor), this.normalColor());