(function(){
  var Database = function (url) {
    this.url = url
    this.sql = window.SQL
  }

  Database.prototype = {
    load: function (callback) {
      var xhr = new XMLHttpRequest()
      xhr.open('GET', this.url, true)
      xhr.responseType = 'arraybuffer'

      var _this = this
      xhr.onload = function(e) {
        var uInt8Array = new Uint8Array(this.response)
        _this.db = new SQL.Database(uInt8Array)
        callback()
      };
      xhr.send()
    },

    query: function (query) {
      var answer = this.db.exec(query)
      var columns = answer[0].columns
      var values = answer[0].values
      var result = []
      for (var i = 0, len1 = values.length; i < len1; ++i) {
        result[i] = {}
        for (var j = 0, len2 = columns.length; j < len2; ++j) {
          result[i][columns[j]] = values[i][j]
        }
      }
      return result
    }
  }

  var App = function (url) {
    this.loading = true
    this.loadedCallback = function () {}
    this.db = new Database('telegramas.sqlite3')
    this.findElements()
    this.bindElements()
    this.readURL()

    var _this = this
    this.db.load(function () {
      _this.loading = false
      _this.$loading.remove()
      _this.loadedCallback()
      _this.runQuery()
    })
  }

  App.prototype = {
    findElements: function () {
      this.$button = document.querySelector('button')
      this.$input = document.querySelector('textarea')
      this.$code = document.querySelector('code')
      this.$table = document.querySelector('table tbody')
      this.$error = document.querySelector('#error')
      this.$loading = document.querySelector('#loading')
    },

    bindElements: function () {
      this.$button.addEventListener('click', this.onButtonClick.bind(this))
      this.$input.addEventListener('keydown', this.onKeyDown.bind(this))
    },

    readURL: function () {
      var match = window.location.search.match(/query=([^&]+)/)
      if (match) {
        this.$input.value = decodeURI(match[1])
      }
    },

    saveURL: function (query) {
      var url = window.location.pathname + '?query=' + encodeURI(query)
      window.history.pushState(null, null, url)
    },

    onKeyDown: function (ev) {
      if (ev.shiftKey && ev.keyCode === 13) {
        ev.preventDefault()
        this.runQuery()
      }
    },

    onButtonClick: function (ev) {
      this.runQuery()
    },

    runQuery: function () {
      var query = this.$input.value
      this.saveURL(query)
      console.log(query)
      var _this = this
      this.ensureLoaded(function () {
        var result
        try {
          result = _this.db.query(query)
        }
        catch (e) {
          return _this.receiveError(e)
        }
        _this.receiveQueryResult(result)
      })
    },

    ensureLoaded: function (cb) {
      if (!this.loading) return cb()
      else this.loadedCallback = cb
    },

    receiveError: function (error) {
      console.log(error)
      this.$error.innerHTML = error
    },

    receiveQueryResult: function (result) {
      this.$error.innerHTML = ''
      this.$code.innerHTML = JSON.stringify(result, null, 2)
      this.writeList(result)
    },

    writeList: function (result) {
      var html = ''
      for (var i = 0, len = result.length; i < len; i++) {
        var t = result[i]
        html += '<tr>'
        html += '<td>' + i + '</td>'
        html += '<td>' + t.id + '</td>'
        html += '<td>' + t.distrito + '</td>'
        html += '<td>' + t.distrito_nombre + '</td>'
        html += '<td>' + t.seccion + '</td>'
        html += '<td>' + t.seccion_nombre + '</td>'
        html += '<td>' + t.circuito + '</td>'
        html += '<td>' + t.mesa + '</td>'
        html += '<td>' + t.votos_nulos + '</td>'
        html += '<td>' + t.votos_blancos + '</td>'
        html += '<td>' + t.votos_recurridos + '</td>'
        html += '<td>' + t.votos_impugnados + '</td>'
        html += '<td>' + t.votos_fpv + '</td>'
        html += '<td>' + t.votos_cambiemos + '</td>'
        html += '<td>' + t.estado + '</td>'
        html += '<td>' + '<a href="' + t.url + '">URL</a>' + '</td>'
        html += '<td>' + '<a href="' + t.pdf + '">PDF</a>' + '</td>'
        html += '</tr>'
      }
      this.$table.innerHTML = html
    }
  }

  new App()
})()
