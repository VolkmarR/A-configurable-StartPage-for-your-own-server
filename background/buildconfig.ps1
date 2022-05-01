$line = "// generated using backgrounds/buildconfig.ps1`r`n"
Get-ChildItem -Recurse -Include *.jpg |
ForEach-Object {
    $isLight = If($_.Directory.Name -eq "light") {"true"} Else {"false"}
    $key = Get-FileHash -path $_.FullName -Algorithm MD5 | Select-Object -ExpandProperty Hash
    $line += "registerBackground('$key', '$($_.Directory.Name)/$($_.Name)', $isLight)`r`n"
    # if the content in the file matches 'Justin'
    #if((Get-Content $_.FullName) -match 'Justin')$({
        # if it) $(matches, write) the path out
     #   $_.FullName | out-file -append backgrounds.js
      #  $_.FullName
      #}
 
  }
  $line | Out-File -FilePath .\..\backgroundConfig.js
